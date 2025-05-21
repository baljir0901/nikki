import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { Moon, Sun, Trash2, Download, ExternalLink, LogOut } from 'lucide-react-native';
import { supabase } from '@/utils/supabase';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };
  
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>表示設定</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              {darkMode ? (
                <Moon size={22} color="#2196F3" style={styles.settingIcon} />
              ) : (
                <Sun size={22} color="#2196F3" style={styles.settingIcon} />
              )}
              <Text style={styles.settingText}>ダークモード</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#E0E0E0", true: "#BBDEFB" }}
              thumbColor={darkMode ? "#2196F3" : "#FAFAFA"}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>毎日のリマインダー</Text>
            </View>
            <Switch
              value={dailyReminder}
              onValueChange={setDailyReminder}
              trackColor={{ false: "#E0E0E0", true: "#BBDEFB" }}
              thumbColor={dailyReminder ? "#2196F3" : "#FAFAFA"}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>データ管理</Text>
          
          <TouchableOpacity style={styles.button}>
            <Download size={22} color="#2196F3" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>日記をエクスポート</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.dangerButton]}>
            <Trash2 size={22} color="#F44336" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, styles.dangerText]}>すべての日記を削除</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>その他</Text>
          
          <TouchableOpacity style={styles.button}>
            <ExternalLink size={22} color="#2196F3" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>プライバシーポリシー</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]} 
            onPress={handleLogout}
          >
            <LogOut size={22} color="#F44336" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, styles.dangerText]}>ログアウト</Text>
          </TouchableOpacity>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>親子日記 v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#424242',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#424242',
  },
  dangerButton: {
    marginTop: 4,
  },
  dangerText: {
    color: '#F44336',
  },
  versionContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9E9E9E',
  },
});