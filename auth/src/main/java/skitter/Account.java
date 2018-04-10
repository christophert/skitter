package skitter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Account implements Serializable {
    @Id
    private String uid;
    private String firstName;
    private String lastName;
    private String email;
    //private Image displayPhoto;

    public String getUid() {
        return uid;
    }
    public void setUid(String uid) {
        this.uid = uid;
    }
    public Account withUid(String uid) {
        this.setUid(uid);
        return this;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public Account withFirstName(String firstname) {
        this.setFirstName(firstname);
        return this;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Account withLastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Account withEmail(String email) {
        this.setEmail(email);
        return this;
    }

//    public Image getDisplayPhoto() {
//        return displayPhoto;
//    }
//    public void setDisplayPhoto(Image displayPhoto) {
//        this.displayPhoto = displayPhoto;
//    }
//    public Account withDisplayPhoto(Image displayPhoto) {
//        this.setDisplayPhoto(displayPhoto);
//        return this;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Account that = (Account) o;

        return uid.equals(that.uid);
    }

    @Override
    public int hashCode() {
        return uid.hashCode();
    }

    @Override
    public String toString() {
        return "Account{" +
                "uid='" + uid + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
