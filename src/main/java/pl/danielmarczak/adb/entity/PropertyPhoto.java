package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "properties_photos")
@EqualsAndHashCode(callSuper = true)
@Data
public class PropertyPhoto extends AbstractEntity{

    private String fileName;
    private String fileTYpe;

    @Lob
    private byte[] fileData;

    @OneToOne(mappedBy = "propertyPhoto")
    @JsonIgnoreProperties("propertyPhoto")
    private Property property;
}
