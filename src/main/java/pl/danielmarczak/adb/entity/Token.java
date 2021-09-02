package pl.danielmarczak.adb.entity;

import lombok.Data;
import pl.danielmarczak.adb.enums.TokenTypeEnum;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tokens")
@Data
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private TokenTypeEnum type;

    private String data;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;


}
