plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.qr_scanner"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.qr_scanner"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation("com.journeyapps:zxing-android-embedded:4.3.0")//add dependency
    implementation("com.squareup.retrofit2:retrofit:2.9.0")//add dependency
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")//add dependency
    implementation("com.google.code.gson:gson:2.8.9")//add dependency
    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}