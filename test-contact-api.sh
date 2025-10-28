#!/bin/bash

# ==================================================
# Script de Testing para Contact API
# ==================================================
#
# Uso: ./test-contact-api.sh [dev|prod]
#

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL base
if [ "$1" == "prod" ]; then
    BASE_URL="https://molokaih.com"
    echo -e "${YELLOW}Testing en PRODUCCIÓN: $BASE_URL${NC}"
else
    BASE_URL="http://localhost:3000"
    echo -e "${BLUE}Testing en DESARROLLO: $BASE_URL${NC}"
fi

API_URL="$BASE_URL/api/contact"

echo ""
echo "=================================================="
echo "🧪 Testing Contact API"
echo "=================================================="
echo ""

# Test 1: Envío exitoso
echo -e "${BLUE}Test 1: Envío exitoso${NC}"
echo "POST $API_URL"
echo ""

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d @test-contact.json)

echo "Response:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.success' > /dev/null; then
    echo -e "${GREEN}✅ Test 1: PASSED${NC}"
else
    echo -e "${RED}❌ Test 1: FAILED${NC}"
fi

echo ""
echo "--------------------------------------------------"
echo ""

# Test 2: Validación - Email inválido
echo -e "${BLUE}Test 2: Validación - Email inválido${NC}"
echo "POST $API_URL"
echo ""

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellido": "User",
    "telefono": "+1234567890",
    "email": "invalid-email",
    "pais": "Argentina",
    "mensaje": "Test message"
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.errors' > /dev/null; then
    echo -e "${GREEN}✅ Test 2: PASSED (Error de validación detectado)${NC}"
else
    echo -e "${RED}❌ Test 2: FAILED${NC}"
fi

echo ""
echo "--------------------------------------------------"
echo ""

# Test 3: Validación - Campo faltante
echo -e "${BLUE}Test 3: Validación - Campo faltante (sin email)${NC}"
echo "POST $API_URL"
echo ""

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellido": "User",
    "telefono": "+1234567890",
    "pais": "Argentina",
    "mensaje": "Test message"
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.errors' > /dev/null; then
    echo -e "${GREEN}✅ Test 3: PASSED (Campo requerido detectado)${NC}"
else
    echo -e "${RED}❌ Test 3: FAILED${NC}"
fi

echo ""
echo "--------------------------------------------------"
echo ""

# Test 4: Validación - Nombre demasiado corto
echo -e "${BLUE}Test 4: Validación - Nombre demasiado corto${NC}"
echo "POST $API_URL"
echo ""

RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "A",
    "apellido": "User",
    "telefono": "+1234567890",
    "email": "test@example.com",
    "pais": "Argentina",
    "mensaje": "Test message with enough characters"
  }')

echo "Response:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.errors' > /dev/null; then
    echo -e "${GREEN}✅ Test 4: PASSED (Validación de longitud funcionando)${NC}"
else
    echo -e "${RED}❌ Test 4: FAILED${NC}"
fi

echo ""
echo "=================================================="
echo "🏁 Tests completados"
echo "=================================================="
echo ""

# Instrucciones
echo -e "${YELLOW}💡 Tips:${NC}"
echo "  - Instala jq para mejor formateo: brew install jq (Mac) o apt install jq (Linux)"
echo "  - Verifica emails en Resend Dashboard: https://resend.com/emails"
echo "  - Revisa logs del servidor para debugging"
echo ""

