export type SlotType = 'LECTURE' | 'LAB' | 'TUTORIAL';

export interface AdminSlot {
  courseCode: string;
  startTime: string;  // e.g., "13:30:00"
  dayOfWeek: string;  // e.g., "Monday", "Tuesday"
  location: string;   // e.g., "102-N-LH"
  slotType: SlotType;
  instructor: string;
  batches: string[];  // array of batch codes
  cancelledDate: string | null;
}

// Optional: a helper function to convert comma-separated batches to an array
export function mapToAdminSlot(dto: any): AdminSlot {
  return {
    courseCode: dto.courseCode,
    startTime: dto.startTime,
    dayOfWeek: dto.dayOfWeek,
    location: dto.location,
    slotType: dto.slotType,
    instructor: dto.instructor,
    batches: dto.batches ? dto.batches.split(',') : [],
    cancelledDate: dto.cancelledDate,
  };
}
