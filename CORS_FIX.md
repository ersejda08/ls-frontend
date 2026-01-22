# 🔧 Fixing the 403 Forbidden Error

## Problem

```
GET http://localhost:8080/api/courses 403 (Forbidden)
AxiosError: Request failed with status code 403
```

## What This Means

Your backend is **rejecting** requests from the frontend. This is typically caused by:

1. ❌ CORS (Cross-Origin Resource Sharing) not enabled
2. ❌ Spring Security blocking requests
3. ❌ Backend endpoint doesn't exist
4. ❌ Backend not running

## ✅ Solution (Backend Configuration Required)

### Step 1: Verify Backend is Running

Open a terminal and test:

```bash
curl http://localhost:8080/api/courses
```

If you get a connection error → **Start your backend first**
If you get 403 → **Continue to Step 2**

### Step 2: Add CORS Configuration to Backend

Add this configuration class to your Spring Boot backend:

**File**: `src/main/java/com/yourcompany/config/CorsConfig.java`

```java
package com.yourcompany.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### Step 3: If Using Spring Security

Add this to your `SecurityConfig` class:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeRequests()
            .antMatchers("/api/**").permitAll()
            .anyRequest().authenticated();

        return http.build();
    }
}
```

### Step 4: Restart Backend

After making changes:

```bash
# Stop the backend (Ctrl+C)
# Then restart it
mvn spring-boot:run
# Or use your IDE's run button
```

### Step 5: Test Again

Refresh your frontend at `http://localhost:5173/`

The errors should now be gone! ✅

---

## 🧪 Debugging Steps

### Check Backend Health

```bash
# Test if backend is running
curl -v http://localhost:8080/api/courses

# Should see:
# < HTTP/1.1 200 OK
# Or if CORS not configured yet:
# < HTTP/1.1 403 Forbidden
```

### Check Frontend Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Go to **Network** tab
5. Click on the failed request
6. Check **Response Headers** for CORS headers

### Common Response Headers to Look For

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: *
```

---

## 📝 Checklist

- [ ] Backend is running on http://localhost:8080
- [ ] CORS configuration added to backend
- [ ] Spring Security configured (if using it)
- [ ] Backend restarted after changes
- [ ] Frontend page refreshed
- [ ] Console shows successful API calls

---

## 🎯 Expected Result

After fixing, you should see in the console:

```
[API Request] GET http://localhost:8080/api/courses
[API Success] 200 [{ courses data... }]
```

And your frontend should display:
✅ Courses on dashboard
✅ Users in user management
✅ No error messages

---

## ⚠️ Still Having Issues?

### Issue: "Connection refused"

- Backend is not running
- Wrong port (should be 8080)
- **Solution**: Start backend with `mvn spring-boot:run`

### Issue: "403 Forbidden" still appears

- CORS not configured correctly
- Spring Security blocking requests
- **Solution**: Add CORS configuration (see Step 2 above)

### Issue: "Cannot GET /api/courses"

- Endpoint doesn't exist in backend
- Check your backend controller routes
- **Solution**: Verify endpoint path in backend

### Issue: Empty data on frontend

- Backend running, CORS working, but no data
- Database might be empty
- **Solution**: Insert test data in database first

---

## 🔗 Frontend Already Updated

The frontend (`src/services/api.js`) has been updated with:

- ✅ Better error logging
- ✅ Request/response interceptors
- ✅ Helpful console messages

**No more changes needed on frontend side!**

---

## 📚 Reference

### Your Frontend Config

- **Frontend URL**: http://localhost:5173
- **Backend URL**: http://localhost:8080/api
- **API Client**: Axios with interceptors

### What Needs to Be Done

- **Only in Backend**: Add CORS configuration
- **Then Restart**: Backend server
- **Finally**: Refresh frontend browser

---

## ✅ Once Fixed

You should see:

1. Dashboard loads with courses
2. Users page shows user list
3. No 403 errors in console
4. All API calls succeed (200 status)

Happy coding! 🚀
