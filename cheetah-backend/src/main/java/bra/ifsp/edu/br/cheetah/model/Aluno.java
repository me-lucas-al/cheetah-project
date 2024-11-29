package bra.ifsp.edu.br.cheetah.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Aluno")
public class Aluno extends User {
    public Aluno() {
        super();
    }
}
