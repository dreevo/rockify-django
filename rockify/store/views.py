from django.shortcuts import render


def store(request):
    return render(request, 'store/store.html', {})


def cart(request):
    return render(request, 'store/cart.html', {})


def checkout(request):
    return render(request, 'store/checkout.html', {})
