# ---------- Stage 1: Build ----------
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# ---------- Stage 2: Run ----------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot uses
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
