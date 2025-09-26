// This defines the different types of class slots, just like Java enum.
export type SlotType = 'LECTURE' | 'LAB' | 'TUTORIAL';

// This interface matches the structure of backend's ClassSlot model.
export interface ClassSlot {
  id: number;
  courseCode: string; // e.g., "CSE101"
  dayOfWeek: string; // e.g., "Monday", "Tuesday"
  startTime: string; // The backend's Time will be sent as a string, e.g., "10:00:00"
  endTime: string; // e.g., "11:00:00"
  location: string; // e.g., "Room 101"
  instructor: string; // e.g., "Dr. Smith"
  slotType: SlotType;
  batch: string;
  group: string;
  year: string;
}
