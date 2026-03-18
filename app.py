# Save this as app.py and run: streamlit run app.py
import streamlit as st
import pandas as pd

# ---------- DATA ----------
import json, os
FILE_NAME = "products_web.json"

def load_data():
    if os.path.exists(FILE_NAME):
        try:
            with open(FILE_NAME, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_data(data):
    with open(FILE_NAME, "w") as f:
        json.dump(data, f, indent=4)

saved_products = load_data()

# ---------- SESSION STATE ----------
if "parts" not in st.session_state:
    st.session_state.parts = []

# ---------- UI ----------
st.title("Factory Cost Web App")

# Product Name
product_name = st.text_input("Product Name")

st.subheader("Add Part")
col1, col2, col3 = st.columns([2, 2, 2])
with col1:
    part_name = st.text_input("Part Name", key="part_name")
with col2:
    price_kg = st.number_input("Price per kg", min_value=0.0, format="%.2f", key="price_kg")
with col3:
    weight_g = st.number_input("Weight (gm)", min_value=0.0, format="%.2f", key="weight_g")

if st.button("Add Part"):
    if part_name and price_kg > 0 and weight_g > 0:
        cost = (price_kg / 1000) * weight_g
        st.session_state.parts.append({"name": part_name, "cost": cost})
        st.success(f"Added {part_name} - ₹{cost:.2f}")
    else:
        st.error("Please fill all part details correctly.")

# Show parts
if st.session_state.parts:
    st.subheader("Parts List")
    df_parts = pd.DataFrame(st.session_state.parts)
    df_parts["Cost"] = df_parts["cost"].apply(lambda x: f"₹{x:.2f}")
    df_parts = df_parts.drop(columns="cost")
    st.table(df_parts)

# Expenses
st.subheader("Monthly Expenses")
col1, col2 = st.columns(2)
with col1:
    labor = st.number_input("Labor ₹", min_value=0.0, format="%.2f")
    electricity = st.number_input("Electricity ₹", min_value=0.0, format="%.2f")
with col2:
    rent = st.number_input("Rent ₹", min_value=0.0, format="%.2f")
    production_qty = st.number_input("Production Qty", min_value=1.0, format="%.2f")

# Profit
profit_percent = st.number_input("Profit %", min_value=0.0, max_value=100.0, format="%.2f")

# Calculate
if st.button("Calculate Total"):
    if not st.session_state.parts:
        st.error("Add at least one part!")
    else:
        raw = sum(p["cost"] for p in st.session_state.parts)
        overhead = (labor + electricity + rent) / production_qty
        final = raw + overhead
        selling = final + (final * profit_percent / 100)

        st.success(f"Total Cost: ₹{final:.2f}")
        st.info(f"Selling Price: ₹{selling:.2f}")

# Save Product
if st.button("Save Product"):
    if product_name:
        saved_products[product_name] = {
            "parts": st.session_state.parts.copy(),
            "expenses": {"labor": labor, "electricity": electricity, "rent": rent, "qty": production_qty},
            "profit_percent": profit_percent
        }
        save_data(saved_products)
        st.success(f"Product '{product_name}' saved successfully!")
        st.session_state.parts.clear()
    else:
        st.error("Enter a product name to save.")
