package br.com.digamo.agendaapi.controller.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import javax.validation.constraints.NotEmpty;

import br.com.digamo.agendaapi.model.entity.ScheduleCalendar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleCalendarDto {

    private Long id;

    @NotEmpty(message = "não pode ser vazio")
	private String subject;
    
    private String location;
	
    private String description;
	
    private String startTime;

	private String endTime;
   	
    private String isAllDay;
   	
   	private String recurrenceRule;
	
   	private String recurrenceException;

	public ScheduleCalendar convert() {
		
		DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm", Locale.getDefault());
		
		return new ScheduleCalendar(
				this.id,
				this.subject,
				this.location,
				this.description,
				LocalDateTime.parse(this.startTime, inputFormatter),
				LocalDateTime.parse(this.endTime, inputFormatter),
				Boolean.valueOf(this.isAllDay),
				this.recurrenceRule,
				this.recurrenceException
				);
	}
}
