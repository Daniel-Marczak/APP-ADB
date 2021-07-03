package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "properties_photos")
@Data
public class PropertyPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_photo_id")
    private Long propertyPhotoId;

    private String fileName;
    private String fileType;

    @Lob
    private byte[] fileData;

    @OneToOne(mappedBy = "propertyPhoto")
    @JsonIgnoreProperties("propertyPhoto")
    private Property property;
}
