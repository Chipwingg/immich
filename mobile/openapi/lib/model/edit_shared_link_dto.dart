//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EditSharedLinkDto {
  /// Returns a new [EditSharedLinkDto] instance.
  EditSharedLinkDto({
    this.description,
    this.expiredAt,
    this.allowUpload,
    this.allowDownload,
    this.showExif,
    this.isEditExpireTime,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? description;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? expiredAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? allowUpload;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? allowDownload;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? showExif;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? isEditExpireTime;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EditSharedLinkDto &&
     other.description == description &&
     other.expiredAt == expiredAt &&
     other.allowUpload == allowUpload &&
     other.allowDownload == allowDownload &&
     other.showExif == showExif &&
     other.isEditExpireTime == isEditExpireTime;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (description == null ? 0 : description!.hashCode) +
    (expiredAt == null ? 0 : expiredAt!.hashCode) +
    (allowUpload == null ? 0 : allowUpload!.hashCode) +
    (allowDownload == null ? 0 : allowDownload!.hashCode) +
    (showExif == null ? 0 : showExif!.hashCode) +
    (isEditExpireTime == null ? 0 : isEditExpireTime!.hashCode);

  @override
  String toString() => 'EditSharedLinkDto[description=$description, expiredAt=$expiredAt, allowUpload=$allowUpload, allowDownload=$allowDownload, showExif=$showExif, isEditExpireTime=$isEditExpireTime]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.description != null) {
      json[r'description'] = this.description;
    } else {
      // json[r'description'] = null;
    }
    if (this.expiredAt != null) {
      json[r'expiredAt'] = this.expiredAt;
    } else {
      // json[r'expiredAt'] = null;
    }
    if (this.allowUpload != null) {
      json[r'allowUpload'] = this.allowUpload;
    } else {
      // json[r'allowUpload'] = null;
    }
    if (this.allowDownload != null) {
      json[r'allowDownload'] = this.allowDownload;
    } else {
      // json[r'allowDownload'] = null;
    }
    if (this.showExif != null) {
      json[r'showExif'] = this.showExif;
    } else {
      // json[r'showExif'] = null;
    }
    if (this.isEditExpireTime != null) {
      json[r'isEditExpireTime'] = this.isEditExpireTime;
    } else {
      // json[r'isEditExpireTime'] = null;
    }
    return json;
  }

  /// Returns a new [EditSharedLinkDto] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EditSharedLinkDto? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EditSharedLinkDto[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EditSharedLinkDto[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EditSharedLinkDto(
        description: mapValueOfType<String>(json, r'description'),
        expiredAt: mapValueOfType<String>(json, r'expiredAt'),
        allowUpload: mapValueOfType<bool>(json, r'allowUpload'),
        allowDownload: mapValueOfType<bool>(json, r'allowDownload'),
        showExif: mapValueOfType<bool>(json, r'showExif'),
        isEditExpireTime: mapValueOfType<bool>(json, r'isEditExpireTime'),
      );
    }
    return null;
  }

  static List<EditSharedLinkDto>? listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EditSharedLinkDto>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EditSharedLinkDto.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EditSharedLinkDto> mapFromJson(dynamic json) {
    final map = <String, EditSharedLinkDto>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EditSharedLinkDto.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EditSharedLinkDto-objects as value to a dart map
  static Map<String, List<EditSharedLinkDto>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EditSharedLinkDto>>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EditSharedLinkDto.listFromJson(entry.value, growable: growable,);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

