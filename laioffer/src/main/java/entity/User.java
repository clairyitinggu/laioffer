package entity;

/**
 * This is the POJO user class
 */
public class User {
    private String username;
    private String email;
    private String password;

    private User(UserBuilder builder) {
            this.username = builder.name;
            this.email = builder.email;
            this.password = builder.password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    public static class UserBuilder {
        private String name;
        private String email;
        private String password;

        public void setName(String name) {
            this.name = name;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public User build() {
            return new User(this);
        }


    }

}
