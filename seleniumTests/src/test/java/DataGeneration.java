import com.github.javafaker.Faker;
import lombok.Value;

public class DataGeneration {
    private DataGeneration(){}

    @Value
    public static class Nickname {
        String nickname;
    }

    private static String generateNick() {
        Faker faker = new Faker();
        return faker.name().firstName();
    }

    public static String getNickname() {return generateNick();}
}
