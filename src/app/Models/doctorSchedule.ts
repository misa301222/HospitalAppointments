export interface DoctorSchedule {
    id: string;
    doctorId: string;
    startTime: number;
    endTime: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}