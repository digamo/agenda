package br.com.digamo.agendaapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.digamo.agendaapi.model.entity.ScheduleCalendar;

public interface ScheduleCalendarRepository extends JpaRepository<ScheduleCalendar, Long>{

}
