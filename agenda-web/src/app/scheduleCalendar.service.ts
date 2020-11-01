import { Injectable } from '@angular/core';
import { ScheduleCalendar } from './calendar/scheduleCalendar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ScheduleCalendarService{

    constructor( private http : HttpClient ){}

    apiURL: string = environment.apiUrlBase + '/api/schedules';

    //Observable waits for the return of the http to act when it has the response of the server
    save(scheduleCalendar: ScheduleCalendar) : Promise<ScheduleCalendar[]>{
        return this.http.post<ScheduleCalendar[]>(this.apiURL , scheduleCalendar).toPromise();
    }

    update(scheduleCalendar: ScheduleCalendar) : Promise<ScheduleCalendar[]>{
        return this.http.put<ScheduleCalendar[]>(this.apiURL, scheduleCalendar).toPromise();
    }

    delete(scheduleCalendar: ScheduleCalendar) : Observable<any>{
        return this.http.delete<ScheduleCalendar>(`${this.apiURL}/${scheduleCalendar.id}`);
    }

    getSchedules() : Observable<ScheduleCalendar[]>{
        return this.http.get<ScheduleCalendar[]>(this.apiURL);
    }
    
}