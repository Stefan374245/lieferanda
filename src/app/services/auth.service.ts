import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { User as AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { 
    this.user$ = user(this.auth);
  }

  // Sign up with email and password
  signUp(email: string, password: string, userData: Partial<AppUser>): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(credential => {
        const userDoc: AppUser = {
          id: credential.user.uid,
          email: credential.user.email!,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          addresses: [],
          favoriteRestaurants: [],
          orderHistory: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const userRef = doc(this.firestore, 'users', credential.user.uid);
        return from(setDoc(userRef, userDoc));
      })
    );
  }

  // Sign in with email and password
  signIn(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(credential => credential.user)
    );
  }

  // Sign out
  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Get current user profile
  getCurrentUserProfile(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.getUserProfile(user.uid);
        }
        return [null];
      })
    );
  }

  // Get user profile from Firestore
  getUserProfile(uid: string): Observable<AppUser | null> {
    const userRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userRef)).pipe(
      map(doc => doc.exists() ? { id: doc.id, ...doc.data() } as AppUser : null)
    );
  }

  // Update user profile
  updateUserProfile(uid: string, userData: Partial<AppUser>): Observable<void> {
    const userRef = doc(this.firestore, 'users', uid);
    const updateData = {
      ...userData,
      updatedAt: new Date()
    };
    return from(updateDoc(userRef, updateData));
  }

  // Get current user ID
  getCurrentUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }
}