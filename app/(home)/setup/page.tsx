"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  TimeInput
} from "@heroui/react";

// FullCalendar + plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Time, parseTime } from "@internationalized/date";
import KNOWN_ROLES from './roles';


// -------------- Types --------------
interface CalendarTimeSlot {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface DailySlot {
  day: string;       // "Monday", "Tuesday", ...
  isAvailable: boolean;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "17:00"
}

// -------------- Helpers --------------
function parseStringToTime(str: string): Time {
  return parseTime(str);
}

function timeValueToString(timeVal: Time): string {
  const hh = String(timeVal.hour).padStart(2, "0");
  const mm = String(timeVal.minute).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** 
 * Generate future events for the next X days from the weeklySlots array.
 * Overwrites old events or merges them as needed.
 */
function generateCalendarEventsFromWeeklySlots(
  weeklySlots: DailySlot[],
  daysAhead = 50
): CalendarTimeSlot[] {
  const newEvents: CalendarTimeSlot[] = [];
  const today = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const slot = weeklySlots.find((s) => s.day === dayOfWeek);

    if (slot && slot.isAvailable) {
      const [startH, startM] = slot.startTime.split(":").map(Number);
      const [endH, endM] = slot.endTime.split(":").map(Number);

      const startDate = new Date(date);
      startDate.setHours(startH, startM, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(endH, endM, 0, 0);

      newEvents.push({
        id: (Date.now() + i).toString(),
        title: "Available",
        start: startDate,
        end: endDate,
      });
    }
  }
  return newEvents;
}

export default function SetupPage() {
  // For demonstration, let's assume we know the supplier's ID (from context, login, etc.)
  // In real code, you might fetch this from your auth state or route param.
  const supplierId = "21419dd2-bab8-4428-964e-32aff097bef8";

  // ---------- Basic Form States ----------
  const [businessName, setBusinessName] = useState("");
  const [approach, setApproach] = useState<"manual" | "auto">("manual");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [role, setRole] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>(KNOWN_ROLES);
  const [selectedRole, setSelectedRole] = useState<string>(""); // single selection


  // ---------- Calendar & Summary States ----------
  const [timeSlots, setTimeSlots] = useState<CalendarTimeSlot[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // ---------- Weekly Availability Modal ----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weeklySlots, setWeeklySlots] = useState<DailySlot[]>([
    { day: "Monday",    isAvailable: true,  startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday",   isAvailable: true,  startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", isAvailable: true,  startTime: "09:00", endTime: "17:00" },
    { day: "Thursday",  isAvailable: true,  startTime: "09:00", endTime: "17:00" },
    { day: "Friday",    isAvailable: true,  startTime: "09:00", endTime: "17:00" },
    { day: "Saturday",  isAvailable: false, startTime: "09:00", endTime: "17:00" },
    { day: "Sunday",    isAvailable: false, startTime: "09:00", endTime: "17:00" },
  ]);

  // -------------- FILE HANDLERS --------------
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    try {
        // 1) Build a FormData object with the PDF file
        const formData = new FormData();
        formData.append("file", file);

        // 2) POST to your FastAPI endpoint
        const res = await fetch(`http://localhost:8000/suppliers/${supplierId}/upload_pdf_summary`, {
            method: "POST",
            body: formData, // no "Content-Type" needed; fetch sets multipart/form-data
        });

        if (!res.ok) {
            throw new Error(`Upload failed with status ${res.status}`);
        }

        // 3) Parse the JSON response
        const result = await res.json();
        console.log("Upload summary result:", result);

        // The result might look like:
        // {
        //   "num_chunks": 10,
        //   "detected_roles": ["accountant", "financial analyst"],
        //   "detected_skills": ["excel", "quickbooks"],
        //   "summary": "• 5 years experience in accounting..."
        // }

        if (result.error) {
            // If your pipeline returned {"error": "No text found..."} or something
            setErrors((prev) => ({ ...prev, file: result.error }));
            return;
        }

        // 4) Store the server results in your local state
        // For instance, pick the first detected role, or join the skills into a string
        const skillsArr = result.detected_skills || [];
        const summary = result.summary || "";

        // e.g. ["accountant", "financial analyst"]
        const detected = result.detected_roles || [];

        // Merge them with existing roleOptions or just replace
        // If you want to preserve known roles, do:
        const merged = Array.from(new Set([...roleOptions, ...detected]));

        // Now update the state
        setRoleOptions(merged);

        // Suppose 'roles' is the array from OpenAI, e.g. ["accountant", "financial analyst"]
        if (detected.length > 0) {
          // Single role => just pick the first
          const roleDetected = detected[0]; // "accountant"
          // Optionally try to find an exact match in KNOWN_ROLES
          const matched = KNOWN_ROLES.find(
            (r) => r.toLowerCase() === roleDetected.toLowerCase()
          );
          if (matched) {
            setSelectedRole(matched);
            setRole(roleDetected);
          } else {
            // fallback if not found
            // or setSelectedRole(roleDetected) if you want a partial match
            setSelectedRole("");
          }
        }

        // Skills can also be stored in a text field
        setSkillsText(skillsArr.join(", "));
        setDescription(summary);

        // Clear any file errors
        setErrors((prev) => ({ ...prev, file: "" }));

    } catch (err) {
        console.error("Error uploading file:", err);
        setErrors((prev) => ({
        ...prev,
        file: "Unable to parse PDF. Please try manual entry or check server logs."
        }));
    }
}

  // -------------- FULLCALENDAR HANDLERS --------------
  function handleSelectSlot(info: any) {
    const newEvent: CalendarTimeSlot = {
      id: Date.now().toString(),
      title: "Available",
      start: info.start,
      end: info.end,
    };
    setTimeSlots((prev) => [...prev, newEvent]);
  }

  function handleEventClick(info: any) {
    if (confirm("Remove this availability block?")) {
      setTimeSlots((prev) => prev.filter((evt) => evt.id !== info.event.id));
    }
  }

  // -------------- SUMMARY + SUBMIT --------------
  function goToSummary() {
    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setShowSummary(true);
  }

  function handleEdit() {
    setShowSummary(false);
  }

  async function handleSubmit() {

    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const skillList = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
      
    const data = {
      businessName,
      approach,
      pdfSummary: description, // or however you store summary
      skills: skillList,
      role,
      timeSlots,
      weeklySlots,
    };

    console.log("Submitting final data:", data);

    const slotsPayload = weeklySlots.map((slot) => ({
        day_of_week: slot.day,
        is_available: slot.isAvailable,
        start_time: slot.startTime,
        end_time: slot.endTime,
    }));
    
    const array = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setSkillsArray(array);
    try {
      // (A) Example of saving user "profile" fields
      const res = await fetch(`http://localhost:8000/suppliers/${supplierId}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Profile update failed with status ${res.status}`);
      }
      const updatedProfile = await res.json();
      console.log("Profile updated in DB with skills array:", updatedProfile);

      alert("Profile setup complete!");
      
      // (B) Example of saving availability as JSON array
      const availRes = await fetch(`http://localhost:8000/suppliers/${supplierId}/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slotsPayload),
      });
      if (!availRes.ok) {
        throw new Error(`Availability update failed with status ${availRes.status}`);
      }
      const updatedAvail = await availRes.json();
      console.log("Availability updated in DB:", updatedAvail);

      // If both requests succeed:
      alert("Profile setup complete! See console for DB updates.");

    } catch (err) {
      console.error("Error saving form data:", err);
      alert("Failed to save form data on the server. Check console.");
    }
    console.log("Form submitted with data:", data);
    alert("Profile setup complete!");
  }

  // -------------- AVAILABILITY MODAL --------------
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function handleToggleAvailability(index: number, checked: boolean) {
    setWeeklySlots((prev) => {
      const newSlots = [...prev];
      newSlots[index].isAvailable = checked;
      return newSlots;
    });
  }

  function handleTimeChange(index: number, field: "startTime" | "endTime", value: string) {
    setWeeklySlots((prev) => {
      const newSlots = [...prev];
      newSlots[index][field] = value;
      return newSlots;
    });
  }

  function handleSaveDailyAvailability() {
    // No server call here. Just update local calendar events
    const newEvents = generateCalendarEventsFromWeeklySlots(weeklySlots, 50);
    setTimeSlots(newEvents);
    closeModal();
  }

  // -------------- SHOW SUMMARY MODE --------------
  if (showSummary) {
    return (
      <div className="p-4 w-1/2 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Review Your Profile</h1>
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p>
            <strong>Business Name:</strong> {businessName}
          </p>
          <Divider />
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Services:</strong> {role}
          </p>
          <p>
            <strong>Skills:</strong> {skillsText}
          </p>
          <Divider />
          <div>
            <strong>Daily Slots:</strong>
            <ul className="list-disc list-inside">
              {weeklySlots.map((s) => (
                <li key={s.day}>
                  {s.day}:{" "}
                  {s.isAvailable
                    ? `${s.startTime} - ${s.endTime}`
                    : "Unavailable"}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Button variant="bordered" onPress={handleEdit}>
            Edit
          </Button>
          <Button color="primary" onPress={() => handleSubmit()}>
            Confirm & Submit
          </Button>
        </div>
      </div>
    );
  }

  // -------------- MAIN RENDER --------------
  return (
    <div className="flex flex-col w-screen h-screen min-h-0">
      <div className="flex-1 min-h-0 overflow-auto">
        <Form
          onSubmit={(e) => e.preventDefault()}
          validationErrors={errors}
          className="p-4 max-w-2xl mx-auto space-y-6"
        >
          <h1 className="text-2xl font-bold">Set Up Your Supplier Profile</h1>

          {/* BUSINESS NAME */}
          <Input
            label="Business Name"
            isRequired
            errorMessage={errors.businessName}
            placeholder="Enter your business name"
            value={businessName}
            onValueChange={setBusinessName}
          />

          {/* APPROACH SELECTION */}
          <RadioGroup
            label="How would you like to fill out your details?"
            orientation="horizontal"
            value={approach}
            onValueChange={(val) => setApproach(val as "manual" | "auto")}
          >
            <Radio value="manual">Manual</Radio>
            <Radio value="auto">Auto (Upload a File)</Radio>
          </RadioGroup>

          {/* FILE UPLOAD SECTION */}
          {approach === "auto" && (
            <div className="space-y-2 w-full">
              <p className="text-sm text-gray-500">
                Upload a PDF, DOC, DOCX, PPT, or PPTX file containing your business info.
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <p className="text-sm text-gray-600">
                      Selected File: {file.name}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="bordered"
                  onPress={handleFileUpload}
                  isDisabled={!file}
                >
                  Parse & Auto-Fill
                </Button>
              </div>

              {errors.file && <p className="text-danger text-sm">{errors.file}</p>}
            </div>
          )}

          {/* DESCRIPTION, SERVICES, SKILLS */}
          <Textarea
            label="Business Description"
            labelPlacement="outside"
            placeholder="Describe your business..."
            value={description}
            onValueChange={setDescription}
          />
          <Select
            label="Services"
            labelPlacement="outside"
            placeholder="Select your role"
            selectedKeys={role ? new Set([role]) : new Set()}
            onSelectionChange={(keys) => {
              // keys is a Set of whatever key(s) the user picked.
              // For single-select, it will be a Set of size 1 (or size 0 if unselected).
              const val = Array.from(keys)[0]; 
              // Convert it to a string and store in your state.
              setRole(val as string);
            }}
            >
            {KNOWN_ROLES.map((r) => (
              <SelectItem key={r} textValue={r}>
                {r}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Skills"
            labelPlacement="outside"
            placeholder="List your relevant skills (e.g. react, nodejs, design)"
            value={skillsText}
            onValueChange={(val) => {
                // `val` is the new string typed by the user
                setSkillsText(val);
            }}
          />

          {/* AVAILABILITY CALENDAR */}
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-semibold mb-2">Calendar Availability</h2>
            <Button variant="bordered" onPress={openModal}>
              Edit Availability
            </Button>
          </div>
          <div className="w-full h-full">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              select={handleSelectSlot}
              events={timeSlots}
              eventClick={handleEventClick}
            />
          </div>

          {/* NAVIGATION */}
          <Divider className="my-4" />
          <div className="flex justify-end">
            <Button color="primary" onPress={goToSummary}>
              Next: Review
            </Button>
          </div>

          {/* MODAL FOR DAILY AVAILABILITY */}
          <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
            <ModalContent>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Set Daily Availability</h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {weeklySlots.map((slot, index) => (
                    <div key={slot.day}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={slot.isAvailable}
                            onChange={(e) =>
                              handleToggleAvailability(index, e.target.checked)
                            }
                          />
                          <span className="font-medium">{slot.day}</span>
                        </div>

                        {!slot.isAvailable ? (
                          <span className="text-sm text-gray-500">
                            Unavailable
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <TimeInput
                              labelPlacement="outside"
                              value={parseStringToTime(slot.startTime) as any}
                              onChange={(timeVal) =>
                                timeVal instanceof Time &&
                                handleTimeChange(
                                  index,
                                  "startTime",
                                  timeValueToString(timeVal)
                                )
                              }
                            />
                            <span>-</span>
                            <TimeInput
                              labelPlacement="outside"
                              value={parseStringToTime(slot.endTime) as any}
                              onChange={(timeVal) =>
                                timeVal instanceof Time &&
                                handleTimeChange(
                                  index,
                                  "endTime",
                                  timeValueToString(timeVal)
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                      <Divider className="my-2" />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={closeModal}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSaveDailyAvailability}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      </div>
    </div>
  );
}
