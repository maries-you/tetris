import com.github.javafaker.Faker;
import lombok.Value;

public class DataGeneration {
    private DataGeneration(){}

    @Value
    public static class Nickname {
        String nickname;
    }

    public static Nickname getNickname() {return new Nickname(generateNick());}

    private static String generateNick() {
        Faker faker = new Faker();
        return faker.name().firstName();
    }
}
