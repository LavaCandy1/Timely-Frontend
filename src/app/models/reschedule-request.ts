export type SlotType = 'LECTURE' | 'LAB' | 'TUTORIAL';

export interface RescheduleRequest {
    id:number;
    slotType: SlotType;
    courseCode: string;
    dayOfWeek: string;
    startTime: string;
    location: string;
    instructor: string;
    batch: string;
    group: string;
    year: string;

    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    reason: string;
}
