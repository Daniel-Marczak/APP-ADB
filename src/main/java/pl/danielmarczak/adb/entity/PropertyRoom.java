package pl.danielmarczak.adb.entity;

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

    private String roomName;
}
