from fastapi import APIRouter
from models.schemas import RiskRequest, RiskResponse

router = APIRouter()

def calculate_risk(data: RiskRequest) -> RiskResponse:
    score = 0
    factors = []
    recommendations = []

    # Age
    if data.age >= 65:
        score += 20
        factors.append("Age 65+ (high risk group)")
    elif data.age >= 45:
        score += 12
        factors.append("Age 45–64 (moderate risk)")

    # Blood pressure
    if data.blood_pressure_systolic >= 140 or data.blood_pressure_diastolic >= 90:
        score += 18
        factors.append(f"High BP: {data.blood_pressure_systolic}/{data.blood_pressure_diastolic} mmHg")
        recommendations.append("Monitor blood pressure daily. Reduce sodium intake.")
    elif data.blood_pressure_systolic >= 130:
        score += 10
        factors.append("Elevated BP: Stage 1 Hypertension")

    # Cholesterol
    if data.cholesterol >= 240:
        score += 15
        factors.append(f"High cholesterol: {data.cholesterol} mg/dL")
        recommendations.append("Follow a low-fat diet. Consider medication if advised by doctor.")
    elif data.cholesterol >= 200:
        score += 8
        factors.append(f"Borderline cholesterol: {data.cholesterol} mg/dL")

    # Smoking
    if data.smoking_status == "Current Smoker":
        score += 15
        factors.append("Active smoker")
        recommendations.append("Quit smoking immediately. Seek cessation support.")
    elif data.smoking_status == "Former Smoker":
        score += 5
        factors.append("Former smoker")

    # Physical activity
    if data.activity_level == "Sedentary":
        score += 12
        factors.append("Sedentary lifestyle")
        recommendations.append("Start with 15-min walks daily. Build up to 150 min/week.")
    elif data.activity_level == "Light (1–2x/week)":
        score += 6

    # BMI
    if data.bmi >= 30:
        score += 10
        factors.append(f"Obese BMI: {data.bmi:.1f}")
        recommendations.append("Target gradual weight loss of 0.5–1 kg/week.")
    elif data.bmi >= 25:
        score += 5
        factors.append(f"Overweight BMI: {data.bmi:.1f}")

    # Sleep
    if data.sleep_hours < 6:
        score += 8
        factors.append(f"Poor sleep: {data.sleep_hours} hrs/night")
        recommendations.append("Aim for 7–8 hours of sleep. Set a consistent bedtime.")
    elif data.sleep_hours < 7:
        score += 4

    # Family history
    if data.family_history:
        score += 10
        factors.append("Positive family history of heart disease")

    # Conditions
    high_risk_conditions = ["Diabetes", "Hypertension", "Obesity"]
    for c in data.conditions:
        if c in high_risk_conditions:
            score += 5
            factors.append(f"Comorbidity: {c}")

    # Cap at 100
    score = min(score, 100)

    # Risk level
    if score >= 60:
        risk_level = "High Risk"
        explanation = f"Your cardiac risk score is {score}/100. Multiple high-risk factors detected. Immediate lifestyle changes and medical consultation recommended."
    elif score >= 35:
        risk_level = "Moderate Risk"
        explanation = f"Your cardiac risk score is {score}/100. Some risk factors present. Consistent healthy habits can significantly lower your risk."
    else:
        risk_level = "Low Risk"
        explanation = f"Your cardiac risk score is {score}/100. Keep maintaining your healthy lifestyle."

    if not recommendations:
        recommendations.append("Maintain your current healthy habits.")
        recommendations.append("Get annual cardiac checkups.")

    return RiskResponse(
        risk_score=score,
        risk_level=risk_level,
        explanation=explanation,
        top_risk_factors=factors[:5],
        recommendations=recommendations[:4]
    )

@router.post("/assess", response_model=RiskResponse)
def assess_risk(data: RiskRequest):
    return calculate_risk(data)

@router.get("/demo")
def demo_risk():
    demo = RiskRequest(
        age=52,
        gender="Male",
        blood_pressure_systolic=142,
        blood_pressure_diastolic=88,
        cholesterol=218,
        smoking_status="Former Smoker",
        activity_level="Sedentary",
        sleep_hours=5.5,
        family_history=True,
        bmi=28.7,
        conditions=["Hypertension", "Diabetes"]
    )
    return calculate_risk(demo)
