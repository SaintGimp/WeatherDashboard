int displayForecast(String command);

Servo servo;

void setup()
{
  Spark.function("display", displayForecast);
  
  servo.attach(A7);
  
  RGB.control(true);
  RGB.brightness(8);
  RGB.control(false);
}

void loop()
{
  // this loops forever
}

// this function automagically gets called upon a matching POST request
int displayForecast(String forecast)
{
  if (forecast == "rain")
  {
    servo.write(30);
    return 1;
  }
  else if (forecast == "cloudy")
  {
    servo.write(65);
    return 1;
  }
  else if (forecast == "partlycloudy")
  {
    servo.write(125);
    return 1;
  }
  else if (forecast == "sunny")
  {
    servo.write(165);
    return 1;
  }
  else return -1;
}