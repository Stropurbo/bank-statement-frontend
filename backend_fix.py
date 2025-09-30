# Backend serializer fix needed - FINAL VERSION

class CurrentUserSerializers(UserSerializer):
    usersubscription = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        # ADD is_active field to the fields list
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'address', 'phone_number', 'profile_image', 'usersubscription', 'is_staff', 'is_active']
        read_only_fields = ['id', 'email']  # is_staff already removed, good!
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_image': {'required': False, 'allow_null': True}
        }

    def update(self, instance, validated_data):
        # Only admin can update is_staff and is_active
        request = self.context.get('request')
        if request and request.user.is_staff:
            # Admin can update all fields including is_staff and is_active
            if 'profile_image' in validated_data:
                new_image = validated_data['profile_image']
                if new_image in [None, '']:
                    validated_data.pop('profile_image', None)
            return super().update(instance, validated_data)
        else:
            # Non-admin users cannot update is_staff and is_active
            validated_data.pop('is_staff', None)
            validated_data.pop('is_active', None)
            if 'profile_image' in validated_data:
                new_image = validated_data['profile_image']
                if new_image in [None, '']:
                    validated_data.pop('profile_image', None)
            return super().update(instance, validated_data)