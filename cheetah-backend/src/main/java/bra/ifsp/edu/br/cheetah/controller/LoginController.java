package bra.ifsp.edu.br.cheetah.controller;


import bra.ifsp.edu.br.cheetah.dto.LoginRequest;
import bra.ifsp.edu.br.cheetah.model.User;
import bra.ifsp.edu.br.cheetah.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Verificar se o usuário existe pelo e-mail
        User user = userService.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null || !user.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.status(401).body("E-mail ou senha inválidos");
        }

        return ResponseEntity.ok("Login realizado com sucesso! Bem-vindo, " + user.getNome());
    }
}