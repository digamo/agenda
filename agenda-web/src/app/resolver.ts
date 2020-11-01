import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleCalendar } from './calendar/scheduleCalendar';
import { ScheduleCalendarService } from './scheduleCalendar.service';

@Injectable()
export class Resolver implements Resolve<Observable<ScheduleCalendar[]>> {
                                        
    constructor(private service : ScheduleCalendarService, ) {}
  
    resolve() {
      return this.service.getSchedules();
    }
  }
