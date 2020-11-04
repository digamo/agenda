import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, AgendaService, DayService, EventFieldsMapping, EventSettingsModel, MonthAgendaService, MonthService, ResourceDetails, Schedule, ScheduleComponent, TimelineMonthService, TimelineViewsService, View, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { ScheduleCalendar } from './scheduleCalendar';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleCalendarService } from '../scheduleCalendar.service';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../common/dateFormatPipe';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, 
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})

export class CalendarComponent implements OnInit {

  public loadPage : Boolean = true;
  
  @ViewChild("scheduleObj")
  public scheduleObj: ScheduleComponent;
  
  @ViewChild("addButton")
  public addButton: ButtonComponent;
  public selectedDate: Date = new Date();
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: any;
  
  scheduleCalendar : ScheduleCalendar;
  public schedules : ScheduleCalendar[] = [];
  public loadedSchedule : Object[] = [];

  constructor(private service : ScheduleCalendarService, 
    private route: ActivatedRoute,
    private dateFormatPipe : DateFormatPipe
    ) {
  }
  
  ngOnInit(): void {
    this.schedules = this.route.snapshot.data.schedules;
    this.loadSchedules();
  }

  loadSchedules() : void {

    this.loadedSchedule = [];
    
      this.schedules.forEach(e => {
        this.loadedSchedule.push({
          Id: e.id,
          Subject: e.subject,
          Location: e.location,
          Description: e.description,
          StartTime: e.startTime,
          EndTime: e.endTime,
          IsAllDay : e.isAllDay,
          RecurrenceRule : e.recurrenceRule,
          RecurrenceException : e.recurrenceException
        
        })
      });
      this.eventSettings = { dataSource: <Object[]>extend([], this.loadedSchedule, null, true) };
  }


  onActionBegin(args: ActionEventArgs): void { 
    
    let isEventChange: boolean = (args.requestType === 'eventChange'); 
    let isEventCreate: boolean = (args.requestType === 'eventCreate'); 
    let isEventRemove: boolean = (args.requestType === 'eventRemove'); 

    if(isEventChange || isEventCreate || isEventRemove){

console.log("arg : " + args.data)

      let eventData: { [key: string]: Object };
      if(isEventChange){
        eventData = args.data as { [key: string]: Object };

      }else if(isEventCreate || isEventRemove){
        eventData = args.data[0] as { [key: string]: Object }; 
      }

      this.loadScheduleObject(eventData);

      if (isEventChange) {
        this.loadPage = false;
        this.updateSchedule();
        

      } else if(isEventCreate) {
        this.loadPage = false;
        this.createSchedule();

      } else if(isEventRemove){
        this.deleteSchedule();
      }
    }
  }


  loadScheduleObject(eventData : EventFieldsMapping){

    let eventField: EventFieldsMapping = this.scheduleObj.eventFields;

    let id: number = eventData[eventField.id] as number;
    let startDate: Date = eventData[eventField.startTime] as Date;
    let endDate: Date = eventData[eventField.endTime] as Date;
    let subject: string = eventData[eventField.subject] as string;
    let location: string = eventData[eventField.location] as string;
    let isAllDay: Boolean = eventData[eventField.isAllDay] as Boolean;
    let description: string = eventData[eventField.description] as string;
    let recurrenceRule: string = eventData[eventField.recurrenceRule] as string;
    let recurrenceException: string = eventData[eventField.recurrenceException] as string;

    this.scheduleCalendar = new ScheduleCalendar(
      id,
      subject,
      location,
      description,
      this.dateFormatPipe.transform(startDate),
      this.dateFormatPipe.transform(endDate),
      isAllDay,
      recurrenceRule,
      recurrenceException);
  }

  createSchedule(){
    this.scheduleCalendar.id = null;

    let promise = new Promise((resolve, reject) =>{
      this.service.save(this.scheduleCalendar).then(response =>{
        this.schedules = response;
        this.loadSchedules();
        this.loadPage = true;
        resolve();
      },
      
      msg =>{
        console.log("Error: " + msg.error);
        reject();
      })

    });
    return promise;
  }

  updateSchedule(){
    console.log(this.scheduleCalendar)

    let promise = new Promise((resolve, reject) =>{
      this.service.update(this.scheduleCalendar).then(response =>{
        this.schedules = response;
        this.loadSchedules();
        this.loadPage = true;
        resolve();
      },
      
      msg =>{
        console.log("Error: " + msg.error);
        reject();
      })

    });
    return promise;
  }

  deleteSchedule(){
    console.log(this.scheduleCalendar)
    this.service.delete(this.scheduleCalendar)
    .subscribe( response =>{}
    , error => console.log("Error: " + error)
    )};

}

