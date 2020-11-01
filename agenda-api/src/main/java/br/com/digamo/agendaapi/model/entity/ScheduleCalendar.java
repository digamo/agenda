package br.com.digamo.agendaapi.model.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ScheduleCalendar implements Serializable{

	public ScheduleCalendar(Long id, String subject, String location, String description, LocalDateTime startTime,
			LocalDateTime endTime, boolean isAllDay, String recurrenceRule, String recurrenceException) {
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

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	@Column(nullable = false )
	private String subject;
    
	@Column(nullable = true )
    private String location;
	
	@Column(nullable = true )
    private String description;
	
	@Column(nullable = true )
    private LocalDateTime startTime;

	@Column(nullable = true )
	private LocalDateTime endTime;
   	
    private boolean isAllDay;
   	
	@Column(nullable = true )
   	private String recurrenceRule;
	
	@Column(nullable = true )
   	private String recurrenceException;
}
