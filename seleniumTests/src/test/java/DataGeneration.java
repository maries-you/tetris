import com.github.javafaker.Faker;

public class DataGeneration {
    private DataGeneration() {
    }

    public static String generateNick() {
        Faker faker = new Faker();
        return faker.name().firstName();
    }
}
