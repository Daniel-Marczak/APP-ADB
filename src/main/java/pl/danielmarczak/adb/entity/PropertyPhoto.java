package pl.danielmarczak.adb.entity;

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

    @Lob
    private byte[] fileData;

    private String fileName;
    private String fileType;

    @Transient
    private String imgSrc;


}
