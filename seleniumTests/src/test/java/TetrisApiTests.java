import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;

public class TetrisApiTests {

    @Test
    void audioJS200() {
        given()
                .baseUri("http://dev.tetris.pet-projets.ru")
                .when().get("/js//audio.js")
                .then().statusCode(200);
    }

    @Test
    void gameJS200() {
        given()
                .baseUri("http://dev.tetris.pet-projets.ru")
                .when().get("/js/game.js")
                .then().statusCode(200);
    }

    @Test
    void cssGameCSS200() {
        given()
                .baseUri("http://dev.tetris.pet-projets.ru")
                .when().get("/css/game.css")
                .then().statusCode(200);
    }

    @Test
    void gaveOverJPG200() {
        given()
                .baseUri("http://dev.tetris.pet-projets.ru")
                .when().get("img/game_over.jpg")
                .then().statusCode(200);
    }

    @Test
    void whenPostThen405() {
        given()
                .baseUri("http://dev.tetris.pet-projets.ru")
                .when().post()
                .then().statusCode(405);
    }
}
