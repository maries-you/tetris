import com.github.javafaker.Faker;

public class DataGeneration {
    private DataGeneration(){}

    private static String generateNick() {
        Faker faker = new Faker();
        return faker.name().firstName();
    }

    public static String getNickname() {return generateNick();}
}
