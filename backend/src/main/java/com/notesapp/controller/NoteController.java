package com.notesapp.controller;

import com.notesapp.model.Note;
import com.notesapp.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    // GET /api/notes  or  GET /api/notes?search=keyword
    @GetMapping
    public List<Note> getAll(@RequestParam(required = false) String search) {
        return service.getAll(search);
    }

    // GET /api/notes/{id}
    @GetMapping("/{id}")
    public Note getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // POST /api/notes
    @PostMapping
    public ResponseEntity<Note> create(@Valid @RequestBody Note note) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(note));
    }

    // PUT /api/notes/{id}
    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @Valid @RequestBody Note note) {
        return service.update(id, note);
    }

    // DELETE /api/notes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
