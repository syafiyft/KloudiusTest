import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import colors from '../styles/colors';
import formStyles from '../styles/formStyles';
import type { AuthStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

export default function SignupScreen({ navigation }: Props) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setError('');
    setLoading(true);
    const err = await signup(name, email.trim(), password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={formStyles.card}>
            <Text style={formStyles.title}>Create account</Text>
            <Text style={formStyles.subtitle}>Sign up to get started</Text>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Name</Text>
              <TextInput
                style={formStyles.input}
                placeholder="Your full name"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Email</Text>
              <TextInput
                style={formStyles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={formStyles.field}>
              <Text style={formStyles.label}>Password</Text>
              <View style={formStyles.passwordRow}>
                <TextInput
                  style={[formStyles.input, formStyles.passwordInput]}
                  placeholder="At least 6 characters"
                  placeholderTextColor={colors.placeholder}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={formStyles.eyeBtn}
                  onPress={() => setShowPassword((v) => !v)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error ? <Text style={formStyles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[formStyles.btn, loading && formStyles.btnDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={formStyles.btnText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={formStyles.link}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={formStyles.linkText}>
                Already have an account?{' '}
                <Text style={formStyles.linkBold}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
