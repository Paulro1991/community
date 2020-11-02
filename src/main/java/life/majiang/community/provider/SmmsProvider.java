package life.majiang.community.provider;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;

@Service
public class SmmsProvider {

    @Value("${sm.ms.api}")
    private String api;

    @Value("${sm.ms.token}")
    private String token;


    public void upload(File file) {

        OkHttpClient client = new OkHttpClient();

        RequestBody requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("smfile", file.getName(),
                        RequestBody.create(MediaType.parse("image/png"), file))
                .build();

        Request request = new Request.Builder()
                .header("Authorization", token)
                .url(api)
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            System.out.println(response.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}