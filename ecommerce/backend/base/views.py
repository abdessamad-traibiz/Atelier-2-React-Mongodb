from copy import error
from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework import status


# Create your views here.
class MyRoutes(APIView):
    def get(self,request):
        return Response("Bonjour")

class ProductsList(APIView):
    def get(self,request):
        produits=Product.objects.all()
        serializer=ProductSerializer(produits,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        data={
            "name":request.data.get("name"),
            "price":request.data.get("price"),
            "category":request.data.get("category"),
            "brand":request.data.get("brand"),
            "description":request.data.get("description"),
            "countInStock":request.data.get("countInStock"),
            "image":request.data.get("image"),
        }
        serializer=ProductSerializer(data=data,many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error,status=status.status.HTTP_400_BAD_REQUEST)

class ProductView(APIView):
    def get(self,request,pk):
        produit=Product.objects.get(id=pk)
        serializer=ProductSerializer(produit,many=False)
        return Response(serializer.data)





