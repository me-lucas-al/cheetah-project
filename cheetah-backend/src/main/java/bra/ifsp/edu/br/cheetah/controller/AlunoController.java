package bra.ifsp.edu.br.cheetah.controller;

import bra.ifsp.edu.br.cheetah.model.Aluno;
import bra.ifsp.edu.br.cheetah.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/aluno")
public class AlunoController {

    @Autowired
    private UserService userService;

    // Rota para listar todos os alunos
    @GetMapping
    public List<Aluno> getAllAlunos() {
        return userService.getAllUsers()
                          .stream()
                          .filter(user -> user instanceof Aluno)
                          .map(user -> (Aluno) user)
                          .collect(Collectors.toList());
    }

     // Rota para buscar um aluno por ID
     @GetMapping("/{id}")
     public ResponseEntity<Aluno> getAlunoById(@PathVariable Long id) {
         try {
             return userService.getUserById(id)
                               .filter(user -> user instanceof Aluno)
                               .map(user -> (Aluno) user)
                               .map(ResponseEntity::ok)
                               .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
     }
    // Rota para criar um aluno
    @PostMapping
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno aluno) {
        try {
            aluno.setTipoUser("Aluno"); // Definindo o tipo como "aluno"
            Aluno novoAluno = (Aluno) userService.saveUser(aluno);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Rota para atualizar um aluno
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
        try {
            aluno.setId(id);
            aluno.setTipoUser("Aluno"); // Garante que o tipo permanece como "aluno"
            Aluno atualizado = (Aluno) userService.saveUser(aluno);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Rota para deletar um aluno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
