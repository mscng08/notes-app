package com.notesapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.notesapp.model.Note;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;MODE=MySQL",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
class NoteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void createReadUpdateDeleteFlow() throws Exception {
        String body = mapper.writeValueAsString(new Note("Groceries", "Milk, eggs"));

        String created = mockMvc.perform(post("/api/notes")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Groceries"))
                .andReturn().getResponse().getContentAsString();

        long id = mapper.readTree(created).get("id").asLong();

        mockMvc.perform(get("/api/notes/" + id)).andExpect(status().isOk());

        String updateBody = mapper.writeValueAsString(new Note("Groceries v2", "Milk, eggs, bread"));
        mockMvc.perform(put("/api/notes/" + id)
                        .contentType(MediaType.APPLICATION_JSON).content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Groceries v2"));

        mockMvc.perform(delete("/api/notes/" + id)).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/notes/" + id)).andExpect(status().isNotFound());
    }

    @Test
    void rejectsBlankTitle() throws Exception {
        String body = mapper.writeValueAsString(new Note("  ", "content"));
        mockMvc.perform(post("/api/notes")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
    }
}
