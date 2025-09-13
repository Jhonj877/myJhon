"""""
numero1 = 15
numero2 = 2
print(numero1 + numero2)
print(numero1 - numero2)
print(numero1 * numero2)
print(numero1 / numero2)
print(numero1 // numero2)
print(numero1 ** numero2)
print(numero1 % numero2)


print("\nOperadores de comparación")
print(numero1 < numero2)
print(numero1 > numero2)
print(numero1 <= numero2)  
print(numero1 >= numero2)
print(numero1 == numero2)
print(numero1 != numero2)

print()
edad = 19

print(edad <= 18 and edad >= 30)
print(edad <= 18 or edad >= 30)
print()

numero = 17 
if (numero > 0):
    print("El número es positivo")
elif (numero == 0):
    print("El número es cero")
else:
    print("El número es negativo")

print()

nombre = input("¿Cuál es tu nombre? ")
print("Hola " + nombre)
numero = int(input("Escribe tu edad: "))
print("Tu edad es : " + str(numero))   


print()

edad = int(input("Escribe tu edad: "))

if (edad < 18):
    print("Eres menor de edad")
elif (edad >= 18 and edad < 25):
    print("Eres un adulto joven")
elif (edad >= 25 and edad < 60):
    print("Eres un adulto mayor")
else:
    print("estas biejito")

#
#tercera clase 
#
print()
for i in range(1000):
    print("Hola " + str(i))
"""

def resta(a, b):
    return a - b
print(resta(10, 5))

lista = [1,2,3,4,5,6,7,8,9,10]
lista.append(11)
print("se agrego el 11 a la lista", lista)
lista.remove(1)
print("se elimino el 1 de la lista", lista)
lista.sort(reverse=True)
print("lista ordenada de mayor a menor", lista)
lista.sort()
print("lista ordenada de menor a mayor", lista)
print("longitud de la lista", len(lista))
lista.insert(0, 1)
print("se agrego el 1 al inicio de la lista", lista)
print("el indice del numero 5 es", lista.index(5))

print(lista) 

nombres = []
notas = []

for i in range(5):
    nombre = input(f"Ingrese el nombre del estudiante #{i+1}: ")
    nota = float(input(f"Ingrese la nota de {nombre}: "))
    nombres.append(nombre)
    notas.append(nota)

for i in range(len(nombres)):
    estado = "Pasa" if notas[i] > 3 else "No pasa"
    print(f"{nombres[i]} - Nota: {notas[i]} - {estado}")
