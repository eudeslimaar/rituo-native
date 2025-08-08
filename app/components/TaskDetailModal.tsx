// path: app/components/TaskDetailModal.tsx
import React from 'react';
import {
    Alert,
    Button,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Task } from '../model/Task';

interface Props {
    task: Task | null;
    visible: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
}

export default function TaskDetailModal({ task, visible, onClose, onDelete }: Props) {
    if (!task) return null;

    const handleDelete = () => {
        Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    onDelete(task.id);
                    onClose();
                },
            },
        ]);
    };

    return (
        <Modal animationType="slide" visible={visible} transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                        <Text style={[styles.title, { backgroundColor: task.color || '#ccc' }]}>
                            {task.icon} {task.name}
                        </Text>
                        <Text style={styles.label}>Start: {task.startTime}</Text>
                        <Text style={styles.label}>End: {task.endTime}</Text>
                        <Text style={styles.label}>Date: {task.startDate}</Text>
                        <Text style={styles.label}>Repeat: {task.repeat}</Text>
                        {task.repeat === 'Custom' && task.customDays?.length && (
                            <Text style={styles.label}>
                                Custom Days: {task.customDays?.join(', ')}
                            </Text>
                        )}

                        <Text style={styles.label}>
                            Validity: {task.validity.type === 'until' ? task.validity.date : 'Forever'}
                        </Text>

                        <View style={styles.buttons}>
                            <View style={styles.button}>
                                <Button title="Close" onPress={onClose} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Delete" color="#ef4444" onPress={handleDelete} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    content: {
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
        borderRadius: 8,
        color: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#444',
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
    },
});
