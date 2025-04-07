package com.example.hotelappbackend.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class AspectLoggingGeneral {

    @Around("execution(* com.example.hotelappbackend.controllers..*(..))")
    public Object controllerMethodLogger(ProceedingJoinPoint joinPoint)
            throws Throwable {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String method_name = method.getName();

        System.out.println( method_name + " : Database request started.");
        Object proceed = joinPoint.proceed();
        System.out.println( method_name + " : Database request finished.");
        return proceed;
    }
}