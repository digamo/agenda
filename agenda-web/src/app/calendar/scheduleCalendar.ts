export class ScheduleCalendar {
    id:number;
    subject: string;
    location: string;
    description: string;
    startTime: Date;
    endTime: Date;
    isAllDay: Boolean;
    recurrenceRule: string;
    recurrenceException: string;

    constructor(
        id : number,
        subject: string,
        location: string,
        description: string,
        startTime: Date,
        endTime: Date,
        isAllDay: Boolean,
        recurrenceRule: string,
        recurrenceException: string
    
    ){
        this.id = id;
        this.subject = subject;
        this.location = location;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAllDay = isAllDay;
        this.recurrenceRule = recurrenceRule;
        this.recurrenceException = recurrenceException;
    
    }
}