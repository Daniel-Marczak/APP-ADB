package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "properties_rooms")
@Data
public class PropertyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_room_id")
    private Long propertyRoomId;

    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "property_id")
    @JsonIgnoreProperties("propertyRooms")
    private Property property;

    private String roomName;
}
