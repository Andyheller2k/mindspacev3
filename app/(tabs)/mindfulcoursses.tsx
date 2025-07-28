import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Course {
  id: string;
  title: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  category: string;
}

const courses: Course[] = [
  { 
    id: '1',
    title: 'Parents and Kids', 
    color: '#F7E07D', 
    icon: 'people-outline',
    description: 'Mindful parenting techniques for stronger family bonds',
    duration: '2 weeks',
    lessons: 14,
    difficulty: 'Beginner',
    isPremium: false,
    category: 'Family'
  },
  { 
    id: '2',
    title: 'Mindful Eating', 
    color: '#DB774E', 
    icon: 'restaurant-outline',
    description: 'Develop a healthy relationship with food through mindfulness',
    duration: '3 weeks',
    lessons: 21,
    difficulty: 'Beginner',
    isPremium: true,
    category: 'Health'
  },
  { 
    id: '3',
    title: 'Mindful Money', 
    color: '#27AE60', 
    icon: 'card-outline',
    description: 'Transform your relationship with money and financial stress',
    duration: '4 weeks',
    lessons: 28,
    difficulty: 'Intermediate',
    isPremium: true,
    category: 'Finance'
  },
  { 
    id: '4',
    title: 'Navigating Injustice', 
    color: '#D4B04A', 
    icon: 'shield-outline',
    description: 'Find peace and strength when facing difficult situations',
    duration: '3 weeks',
    lessons: 18,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Social'
  },
  { 
    id: '5',
    title: 'Mindfulness at Work', 
    color: '#F4C37C', 
    icon: 'briefcase-outline',
    description: 'Reduce workplace stress and increase productivity',
    duration: '2 weeks',
    lessons: 16,
    difficulty: 'Beginner',
    isPremium: false,
    category: 'Work'
  },
  { 
    id: '6',
    title: 'Calming Everyday Anxiety', 
    color: '#2D9CDB', 
    icon: 'heart-outline',
    description: 'Practical tools to manage anxiety and find inner calm',
    duration: '4 weeks',
    lessons: 24,
    difficulty: 'Beginner',
    isPremium: false,
    category: 'Mental Health'
  },
  { 
    id: '7',
    title: 'Thrive as a Leader', 
    color: '#1C2954', 
    icon: 'trophy-outline',
    description: 'Mindful leadership skills for better team management',
    duration: '5 weeks',
    lessons: 35,
    difficulty: 'Advanced',
    isPremium: true,
    category: 'Leadership'
  },
  { 
    id: '8',
    title: 'New and Popular', 
    color: '#F5D49E', 
    icon: 'trending-up-outline',
    description: 'Discover the latest mindfulness techniques and practices',
    duration: '1 week',
    lessons: 7,
    difficulty: 'Beginner',
    isPremium: false,
    category: 'Featured'
  },
];

export default function MindfulnessCourses(): JSX.Element {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const handleCoursePress = (course: Course) => {
    if (course.isPremium && !enrolledCourses.includes(course.id)) {
      Alert.alert(
        'Premium Course',
        `"${course.title}" requires a premium subscription. Would you like to upgrade?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Upgrade', 
            onPress: () => console.log('Upgrade to premium') 
          },
          { 
            text: 'Preview', 
            onPress: () => handleEnrollCourse(course.id) 
          }
        ]
      );
    } else {
      handleEnrollCourse(course.id);
    }
  };

  const handleEnrollCourse = (courseId: string) => {
    setEnrolledCourses(prev => 
      prev.includes(courseId) 
        ? prev 
        : [...prev, courseId]
    );
    console.log(`Enrolled in course: ${courseId}`);
  };

  const getDifficultyColor = (difficulty: Course['difficulty']): string => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderCourseCard = (course: Course, index: number) => (
    <TouchableOpacity
      key={course.id}
      style={[styles.card, { backgroundColor: course.color }]}
      onPress={() => handleCoursePress(course)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[
            styles.cardTitle,
            { color: course.color === '#1C2954' ? '#fff' : '#000' }
          ]}>
            {course.title}
          </Text>
          {course.isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="diamond" size={12} color="#f59e0b" />
            </View>
          )}
        </View>
        
        <Text style={[
          styles.cardDescription,
          { color: course.color === '#1C2954' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }
        ]}>
          {course.description}
        </Text>
        
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons 
              name="time-outline" 
              size={14} 
              color={course.color === '#1C2954' ? '#fff' : '#000'} 
            />
            <Text style={[
              styles.metaText,
              { color: course.color === '#1C2954' ? '#fff' : '#000' }
            ]}>
              {course.duration}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons 
              name="book-outline" 
              size={14} 
              color={course.color === '#1C2954' ? '#fff' : '#000'} 
            />
            <Text style={[
              styles.metaText,
              { color: course.color === '#1C2954' ? '#fff' : '#000' }
            ]}>
              {course.lessons} lessons
            </Text>
          </View>
          
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(course.difficulty) }
          ]}>
            <Text style={styles.difficultyText}>{course.difficulty}</Text>
          </View>
        </View>
        
        {enrolledCourses.includes(course.id) && (
          <View style={styles.enrolledBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.enrolledText}>Enrolled</Text>
          </View>
        )}
      </View>
      
      <View style={styles.iconContainer}>
        <Ionicons 
          name={course.icon} 
          size={32} 
          color={course.color === '#1C2954' ? '#fff' : '#000'} 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Easy-To-Learn</Text>
          <Text style={styles.title}>Mindfulness Courses</Text>
          <Text style={styles.headerDescription}>
            Transform your life with guided mindfulness practices
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{courses.length}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {courses.reduce((sum, course) => sum + course.lessons, 0)}
            </Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{enrolledCourses.length}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </View>
        </View>

        {/* Course Cards */}
        <View style={styles.coursesContainer}>
          {courses.map(renderCourseCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  subtitle: {
    color: '#F2994A',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 8,
    color: '#1F2937',
  },
  headerDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  coursesContainer: {
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    marginRight: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 4,
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  enrolledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  enrolledText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});