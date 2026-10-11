
package com.notesapp.service;

import java.util.List;
import java.util.Objects;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.notesapp.exception.NoteNotFoundException;
import com.notesapp.model.Note;
import com.notesapp.repository.NoteRepository;

@Service
@Transactional
public class NoteService {

    private final NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    @Transactional(readOnly = true)
    public List<Note> getAll(String search) {
        if (search == null || search.isBlank()) {
            return repository.findAllByOrderByUpdatedAtDesc();
        }

        String q = search.trim();

        return repository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByUpdatedAtDesc(
                        q, q);
    }

    @Transactional(readOnly = true)
    public Note getById(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public Note create(@NonNull Note note) {
        note.setId(null);
        note.setTitle(note.getTitle().trim());
        return repository.save(note);
    }

    public Note update(@NonNull Long id, @NonNull Note updated) {
        Note existing = getById(id);

        existing.setTitle(updated.getTitle().trim());
        existing.setContent(updated.getContent());

        return repository.save(existing);
    }

    public void delete(@NonNull Long id) {
        Note existing = getById(id);
        repository.delete(existing);
    }
}