package br.com.digamo.agendaapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.digamo.agendaapi.controller.dto.ScheduleCalendarDto;
import br.com.digamo.agendaapi.model.entity.ScheduleCalendar;
import br.com.digamo.agendaapi.model.repository.ScheduleCalendarRepository;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin("*") // configuração para aceitar requisição de outros domínios
public class ScheduleCalendarController {

	
	@Autowired
	private ScheduleCalendarRepository repository;

	/**
	 * Lista todos os contatos
	 * @return 
	 */
	@GetMapping
	public List<ScheduleCalendar> list(){
		
		return repository.findAll();
		
	}
	
	/**
	 * Persiste o objeto contact passado como parametro
	 * @param contact
	 * @return
	 */
	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public List<ScheduleCalendar> save ( @RequestBody @Valid ScheduleCalendarDto schedule) {
		
		repository.save(schedule.convert());
		
		return repository.findAll();
	}

	/**
	 * Persiste o objeto contact passado como parametro
	 * @param contact
	 * @return
	 */
	@PutMapping
	public List<ScheduleCalendar> update ( @RequestBody @Valid ScheduleCalendarDto schedule) {
		
		repository.save(schedule.convert());
		
		return repository.findAll();
	}
	
	/**
	 * @param id que será deletado
	 */
	@DeleteMapping("{id}")
	//Indica que não há conteúdo de retorno
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void delete ( @PathVariable Long id ) {
		
		repository.deleteById(id);
	}
}
