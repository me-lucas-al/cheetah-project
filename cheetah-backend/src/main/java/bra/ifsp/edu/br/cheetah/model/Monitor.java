package bra.ifsp.edu.br.cheetah.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("Monitor")
public class Monitor extends User {

    @Column(unique = true)
    private String rg;

    private String formacao;
    private String formacaoStatus; 

    @Lob
    private byte[] diploma;     @Lob
    private byte[] documentoDeIdentidade; 
    public Monitor() {
        super();
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getFormacao() {
        return formacao;
    }

    public void setFormacao(String formacao) {
        this.formacao = formacao;
    }

    public String getFormacaoStatus() {
        return formacaoStatus;
    }

    public void setFormacaoStatus(String formacaoStatus) {
        this.formacaoStatus = formacaoStatus;
    }

    public byte[] getDiploma() {
        return diploma;
    }

    public void setDiploma(byte[] diploma) {
        this.diploma = diploma;
    }

    public byte[] getDocumentoDeIdentidade() {
        return documentoDeIdentidade;
    }

    public void setDocumentoDeIdentidade(byte[] documentoDeIdentidade) {
        this.documentoDeIdentidade = documentoDeIdentidade;
    }
}
