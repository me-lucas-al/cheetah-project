package bra.ifsp.edu.br.cheetah.controller;

import bra.ifsp.edu.br.cheetah.model.Monitor;
import bra.ifsp.edu.br.cheetah.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/monitor")
public class MonitorController {

    @Autowired
    private UserService userService;

    // Rota para listar todos os monitores
    @GetMapping
    public List<Monitor> getAllMonitores() {
        return userService.getAllUsers()
                          .stream()
                          .filter(user -> user instanceof Monitor)
                          .map(user -> (Monitor) user)
                          .collect(Collectors.toList());
    }
      // Rota para buscar um monitor por ID
      @GetMapping("/{id}")
      public ResponseEntity<Monitor> getMonitorById(@PathVariable Long id) {
          try {
              return userService.getUserById(id)
                                .filter(user -> user instanceof Monitor)
                                .map(user -> (Monitor) user)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
          } catch (Exception e) {
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
          }
      }
    // Rota para criar um monitor
    @PostMapping
    public ResponseEntity<Monitor> createMonitor(@RequestBody Monitor monitor) {
        try {
            monitor.setTipoUser("Monitor"); // Definindo o tipo como "monitor"
            Monitor novoMonitor = (Monitor) userService.saveUser(monitor);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoMonitor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Rota para atualizar um monitor
    @PutMapping("/{id}")
    public ResponseEntity<Monitor> updateMonitor(@PathVariable Long id, @RequestBody Monitor monitor) {
        try {
            monitor.setId(id);
            monitor.setTipoUser("Monitor"); // Garante que o tipo permanece como "monitor"
            Monitor atualizado = (Monitor) userService.saveUser(monitor);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Rota para deletar um monitor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonitor(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
